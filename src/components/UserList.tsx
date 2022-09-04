import React, { useEffect } from "react";
import { toast } from "react-toastify";

import { DataGrid, GridColDef } from "@mui/x-data-grid/index";
import { useAppSelector } from "../redux/store";
import { userApi } from "../redux/api/userApi";
import {
  useDeleteUserMutation,
  useUpdateStatusMutation,
} from "../redux/api/userApi";
import EnhancedTableToolbar from "./EnhancedTableToolbar";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 190 },
  { field: "name", headerName: "Name", width: 190 },
  { field: "email", headerName: "Email", width: 180 },
  {
    field: "createdAt",
    headerName: "Date registration",
    type: "number",
    width: 210,
  },
  {
    field: "lastLogin",
    headerName: "Last date login",
    type: "number",
    width: 210,
  },
  {
    field: "status",
    headerName: "Status",
    width: 180,
  },
];

const UserList = () => {
  const [selected, setSelected] = React.useState<string[]>([]);
  const [deleteUser] = useDeleteUserMutation();
  const allUsers = useAppSelector((state) => state.userState.users);
  const [updateStatus] = useUpdateStatusMutation();
  const [updateStatusActiv] = useUpdateStatusMutation();
  const { isLoading, isError, error } = userApi.endpoints.getAllUsers.useQuery(
    [],
    { refetchOnMountOrArgChange: true }
  );

  useEffect(() => {
    if (isError) {
      if (Array.isArray((error as any).data?.error)) {
        (error as any).data.error.forEach((el: any) =>
          toast.error(el.message, {
            position: "bottom-right",
          })
        );
      } else {
        toast.error((error as any).data.message, {
          position: "bottom-right",
        });
      }
    }
  }, [isError, error]);

  const handleDelete = () => {
    deleteUser({ id: selected });
  };

  const handleStatusUpdate = () => {
    updateStatus({ id: selected, status: "block" });
  };

  const handleStatusUpdateActive = () => {
    updateStatusActiv({ id: selected, status: "active" });
  };

  return (
    <div style={{ height: 500, width: "100%", marginTop: "40px" }}>
      {isLoading && <div>Loading...</div>}
      <EnhancedTableToolbar
        numSelected={selected.length}
        selected={selected}
        handleDelete={handleDelete}
        handleStatusUpdate={handleStatusUpdate}
        handleStatusUpdateActive={handleStatusUpdateActive}
      />
      <DataGrid
        onSelectionModelChange={(newSelectionModel) => {
          //@ts-ignore
          setSelected(newSelectionModel);
        }}
        rows={allUsers}
        columns={columns}
        pageSize={20}
        rowsPerPageOptions={[20]}
        checkboxSelection
      />
    </div>
  );
};
export default UserList;
