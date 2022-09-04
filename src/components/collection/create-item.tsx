import { FC, useEffect } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import { toast } from "react-toastify";
import { object, string, TypeOf, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";
import { Box, CircularProgress, TextField, Typography } from "@mui/material";
import { useCreateItemMutation } from "../../redux/api/itemApi";
import FileUpload from "../FileUpload/FileUpload";

interface ICreateItemProp {
  setOpenItemModal: (openItemModal: boolean) => void;
  collectionId: string;
}

const createItemSchema = object({
  name: string().min(1, "name is required"),
  hashtag: string().max(20).nonempty("Category is required"),
  description: string().nonempty("Description is required"),
  image: z.instanceof(File),
});

export type ICreateItem = TypeOf<typeof createItemSchema>;

const CreateItem: FC<ICreateItemProp> = ({
  setOpenItemModal,
  collectionId,
}) => {
  const [createItem, { isLoading, isError, error, isSuccess }] =
    useCreateItemMutation();

  const methods = useForm<ICreateItem>({
    resolver: zodResolver(createItemSchema),
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Item created successfully");
      setOpenItemModal(false);
    }

    if (isError) {
      if (Array.isArray((error as any).data.error)) {
        (error as any).data.error.forEach((el: any) =>
          toast.error(el.message, {
            position: "top-right",
          })
        );
      } else {
        toast.error((error as any).data.message, {
          position: "top-right",
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  useEffect(() => {
    if (methods.formState.isSubmitting) {
      methods.reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [methods.formState.isSubmitting]);

  const onSubmitHandler: SubmitHandler<ICreateItem> = (values) => {
    const formData = new FormData();
    const data = { ...values, itemCollection: collectionId };
    formData.append("image", values.image);
    formData.append("data", JSON.stringify(data));
    createItem(formData);
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" sx={{ mb: 3 }}>
        <Typography variant="h5" component="h1">
          Create Item
        </Typography>
        {isLoading && <CircularProgress size="1rem" color="primary" />}
      </Box>
      <FormProvider {...methods}>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={methods.handleSubmit(onSubmitHandler)}
        >
          <TextField
            label="Item name"
            fullWidth
            sx={{ mb: "1rem" }}
            {...methods.register("name")}
          />
          <TextField
            label="hashtag"
            fullWidth
            sx={{ mb: "1rem" }}
            {...methods.register("hashtag")}
          />
          <TextField
            label="Description"
            fullWidth
            multiline
            rows={2}
            sx={{ mb: "1rem" }}
            {...methods.register("description")}
          />
          <FileUpload limit={1} name="image" multiple={false} />
          <LoadingButton
            variant="contained"
            fullWidth
            sx={{
              py: "0.8rem",
              mt: 4,
              backgroundColor: "#5d8c9b",
              "&:hover": {
                backgroundColor: "#304850",
              },
            }}
            type="submit"
            loading={isLoading}
          >
            Create Item
          </LoadingButton>
        </Box>
      </FormProvider>
    </Box>
  );
};

export default CreateItem;
