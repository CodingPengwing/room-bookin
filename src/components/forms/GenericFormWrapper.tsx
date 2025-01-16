"use client";

// material-ui
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

// project import
import MainCard from "@/components/MainCard";
import Typography from "@mui/material/Typography";

const DEFAULT_WIDTH = 6;

interface GenericFormWrapperProps {
  children: React.ReactNode;
  width?: number;
  title?: string;
  entityName: string;
  onCancel: () => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onDelete?: () => void;
  errorMessage?: string;
}

export default function GenericFormWrapper({
  children,
  width,
  title,
  entityName,
  onCancel,
  onSubmit,
  onDelete,
  errorMessage,
}: GenericFormWrapperProps) {
  return (
    <MainCard>
      {title && (
        <Typography variant="h5" sx={{ mb: 2 }}>
          {title}
        </Typography>
      )}
      <form onSubmit={onSubmit}>
        <Grid item xs={width ?? DEFAULT_WIDTH} sm={width ?? DEFAULT_WIDTH}>
          <Grid container spacing={2} direction="column">
            {children}
            {errorMessage && (
              <div className="m-4 p-2 bg-red-200 border rounded border-red-400">
                {errorMessage}
              </div>
            )}
            <Stack
              direction="row"
              spacing={2}
              justifyContent="right"
              alignItems="center"
              sx={{ mt: 8 }}
            >
              {onDelete && (
                <Button variant="contained" color="error" onClick={onDelete}>
                  Delete {entityName}
                </Button>
              )}
              <Button variant="outlined" color="secondary" onClick={onCancel}>
                Cancel
              </Button>
              <Button
                variant="contained"
                type="submit"
                sx={{ textTransform: "none" }}
              >
                Save {entityName}
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </MainCard>
  );
}
