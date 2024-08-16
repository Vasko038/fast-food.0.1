import { Box, Divider, Grid, IconButton } from "@mui/material";
import React from "react";
import { useDataContext } from "../../pages/Admin";
import { MdOutlineEdit } from "react-icons/md";
import { LuTrash2 } from "react-icons/lu";

export const FiliallarTable = () => {
  const { filiallar } = useDataContext();

  return (
    <Box className="py-5">
      <Box className="py-5 bg-white shadow-xl ps-12">
        <Grid container>
          <Grid item xs={2} className="ps-4">
            Filial nomi (uz)
          </Grid>
          <Divider orientation="vertical" flexItem sx={{ marginX: 2 }} />

          <Grid item xs={2}>
            Filial nomi (ru)
          </Grid>
          <Divider orientation="vertical" flexItem sx={{ marginX: 2 }} />

          <Grid item xs={2}>
            Mo'ljal
          </Grid>

          <Divider orientation="vertical" flexItem sx={{ marginX: 2 }} />

          <Grid item xs={2}>
            Ish vaqti
          </Grid>
          <Divider orientation="vertical" flexItem sx={{ marginX: 2 }} />

          <Grid item xs={2}>
            Actions
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          padding: "20px 38px",
          minHeight: "400px",
          overflowY: "auto",
        }}
      >
        <Box
          sx={{
            width: "100%",
          }}
        >
          {filiallar.map((f) => {
            return (
              <Box
                sx={{
                  marginBlock: "10px",
                  backgroundColor: "white",
                  borderRadius: "10px",
                  boxShadow: "0px 2px 2px 0px #AEB0B550",
                  padding: "20px 10px",
                }}
              >
                <Grid container spacing={2}>
                  <Grid
                    item
                    xs={2}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginRight: "35px",
                    }}
                  >
                    <p className="ps-4">{f.nameUz}</p>
                  </Grid>
                  <Grid
                    item
                    xs={2}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginRight: "40px",
                    }}
                  >
                    {f.nameRu}
                  </Grid>
                  <Grid
                    item
                    xs={2}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginRight: "40px",
                    }}
                  >
                    {f.moljal}
                  </Grid>
                  <Grid
                    item
                    xs={2}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginRight: "30px",
                    }}
                  >
                    {f.ishVaqt}
                  </Grid>
                  <Grid item xs={2}>
                    <IconButton
                      sx={{
                        border: "4px solid #EDEFF3",
                        marginRight: "12px",
                      }}
                    >
                      <MdOutlineEdit />
                    </IconButton>
                    <IconButton
                      sx={{
                        border: "4px solid #EDEFF3",
                      }}
                    >
                      <LuTrash2 />
                    </IconButton>
                  </Grid>
                </Grid>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};
