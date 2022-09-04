import { FC, useEffect } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import { object, string, TypeOf, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, CircularProgress, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";

interface ICreateCommentProp {
  setOpenCommentModal: (openCommentModal: boolean) => void;
  itemId: string;
  createComment: any;
  isLoading: boolean;
  isSuccess: boolean;
}

const createCommentSchema = object({
  comment: string().min(1),
});

export type ICreateComment = TypeOf<typeof createCommentSchema>;

const CreateComment: FC<ICreateCommentProp> = ({
  setOpenCommentModal,
  itemId,
  createComment,
  isLoading,
}) => {
  const methods = useForm<ICreateComment>({
    resolver: zodResolver(createCommentSchema),
  });


  useEffect(() => {
    if (methods.formState.isSubmitting) {
      methods.reset();
    }

    if (methods.formState.isSubmitSuccessful) {
      setOpenCommentModal(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [methods.formState.isSubmitting, methods.formState.isSubmitSuccessful]);

  const onSubmitHandler: SubmitHandler<ICreateComment> = (values) => {
    const formData = new FormData();
    formData.append("data", JSON.stringify(values));
    createComment({ id: itemId, data: formData });
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" sx={{ mb: 1 }}>
        <Typography variant="h5" component="h1">
          Create Comment
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
            label="You comment"
            fullWidth
            multiline
            rows={4}
            sx={{ mb: "1rem" }}
            {...methods.register("comment")}
          />
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
            Create comment
          </LoadingButton>
        </Box>
      </FormProvider>
    </Box>
  );
};

export default CreateComment;
