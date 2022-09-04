import { FC, useEffect } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import { toast } from "react-toastify";
import { object, string, TypeOf, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";
import { Box, CircularProgress, TextField, Typography } from "@mui/material";
import FileUpload from "../FileUpload/FileUpload";
import { useCreateCollectionMutation } from "../../redux/api/collectionApi";

interface ICreateCollectionProp {
  setOpenCollectionModal: (openCollectionModal: boolean) => void;
}

const createCollectionSchema = object({
  name: string().min(1, "name is required"),
  category: string().max(20,"Category is required"),
  description: string().max(150,"Description is required"),
  image: z.instanceof(File),
});

export type ICreateCollection = TypeOf<typeof createCollectionSchema>;

const CreateCollection: FC<ICreateCollectionProp> = ({
  setOpenCollectionModal,
}) => {
  const [createCollection, { isLoading, isError, error, isSuccess }] =
    useCreateCollectionMutation();

  const methods = useForm<ICreateCollection>({
    resolver: zodResolver(createCollectionSchema),
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Collection created successfully");
      setOpenCollectionModal(false);
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

  const onSubmitHandler: SubmitHandler<ICreateCollection> = (values) => {
    const formData = new FormData();

    formData.append("image", values.image);
    formData.append("data", JSON.stringify(values));
    createCollection(formData);
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" sx={{ mb: 3 }}>
        <Typography variant="h5" component="h1">
          Create Collection
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
            label="Collection name"
            fullWidth
            sx={{ mb: "1rem" }}
            {...methods.register("name")}
          />
          <TextField
            label="Category"
            fullWidth
            sx={{ mb: "1rem" }}
            {...methods.register("category")}
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
            sx={{ py: "0.8rem", mt: 4, backgroundColor: "#5d8c9b",
            "&:hover": {
              backgroundColor: "#304850",
            }, }}
            type="submit"
            loading={isLoading}
          >
            Create Collection
          </LoadingButton>
        </Box>
      </FormProvider>
    </Box>
  );
};

export default CreateCollection;
