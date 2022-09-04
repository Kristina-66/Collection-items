import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonIcon from "@mui/icons-material/Person";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material/styles";

interface EnhancedTableToolbarProps {
  numSelected: number;
  selected: string[];
  handleDelete: () => void;
  handleStatusUpdate: () => void;
  handleStatusUpdateActive: () => void;
  handleRoleUpdate: () => void;
  handleRoleUpdateUser: () => void;
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const { numSelected } = props;
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {props.selected.length > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Users list
        </Typography>
      )}

      {!!numSelected && (
        <div style={{ display: "inline-block", width: "250px " }}>
          <Tooltip title="Add Admin">
            <IconButton onClick={props.handleRoleUpdate}>
              <PersonAddIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Remove Admin">
            <IconButton onClick={props.handleRoleUpdateUser}>
              <PersonRemoveIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Block">
            <IconButton onClick={props.handleStatusUpdate}>
              <PersonOffIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Unblock">
            <IconButton onClick={props.handleStatusUpdateActive}>
              <PersonIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton onClick={props.handleDelete}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </div>
      )}
    </Toolbar>
  );
};

export default EnhancedTableToolbar;
