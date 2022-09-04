import { FC, useEffect } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import { pickBy } from "lodash";
import { toast } from "react-toastify";
import { object, string, TypeOf, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, CircularProgress, TextField, Typography } from "@mui/material";
import FileUpload from "../FileUpload/FileUpload";
import { LoadingButton } from "@mui/lab";
import { useUpdateCollectionMutation } from "../../redux/api/collectionApi";
import { ICollectionResponse } from "../../redux/api/types";

interface IUpdateCollectionProp {
  setOpenCollectionModal: (openCollectionModal: boolean) => void;
  collection: ICollectionResponse;
}

const updateCollectionSchema = object({
  name: string(),
  category: string().max(50),
  description: string().max(50),
  image: z.instanceof(File),
}).partial();

type IUpdateCollection = TypeOf<typeof updateCollectionSchema>;

const UpdateCollection: FC<IUpdateCollectionProp> = ({
  setOpenCollectionModal,
  collection,
}) => {
  const [updateCollection, { isLoading, isError, error, isSuccess }] =
    useUpdateCollectionMutation();

  const methods = useForm<IUpdateCollection>({
    resolver: zodResolver(updateCollectionSchema),
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Collection updated successfully");
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

  useEffect(() => {
    if (collection) {
      methods.reset({
        name: collection.name,
        category: collection.category,
        description: collection.description,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collection]);

  const onSubmitHandler: SubmitHandler<IUpdateCollection> = (values) => {
    const formData = new FormData();
    const filteredFormData = pickBy(
      values,
      (value) => value !== "" && value !== undefined
    );
    const { image, ...otherFormData } = filteredFormData;
    if (image) {
      formData.append("image", image);
    }
    formData.append("data", JSON.stringify(otherFormData));
    updateCollection({ id: collection?._id!, collection: formData });
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" sx={{ mb: 3 }}>
        <Typography variant="h5" component="h1">
          Edit Post
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
            label="Title"
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
            label="Category"
            fullWidth
            sx={{ mb: "1rem" }}
            {...methods.register("description")}
          />
          <FileUpload limit={1} name="image" multiple={false} />
          <LoadingButton
            variant="contained"
            fullWidth
            sx={{ py: "0.8rem", mt: 4, backgroundColor: "#2363eb" }}
            type="submit"
            loading={isLoading}
          >
            Edit Collection
          </LoadingButton>
        </Box>
      </FormProvider>
    </Box>
  );
};

export default UpdateCollection;
