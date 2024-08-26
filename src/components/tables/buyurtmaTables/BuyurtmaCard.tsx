import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button, Grid, IconButton, Stack } from "@mui/material";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { useDataContext } from "../../Context";
import { IMahsulot } from "../../Interface";

export const BuyurtmaFormTableCard = ({ product }: { product: IMahsulot }) => {
  const { basket, setBasket } = useDataContext();

  const existingItem = basket.find((item) => item.mahsulotId === product.id);
  const count = existingItem ? existingItem.count : 0;

  const handleIncrement = () => {
    if (existingItem) {
      setBasket(
        basket.map((item) =>
          item.mahsulotId === product.id
            ? { ...item, count: item.count + 1 }
            : item
        )
      );
    } else {
      setBasket([
        ...basket,
        {
          mahsulotId: product.id,
          count: 1,
        },
      ]);
    }
  };

  const handleDecrement = () => {
    if (existingItem && existingItem.count > 1) {
      setBasket(
        basket.map((item) =>
          item.mahsulotId === product.id
            ? { ...item, count: item.count - 1 }
            : item
        )
      );
    } else if (existingItem && existingItem.count === 1) {
      setBasket(basket.filter((item) => item.mahsulotId !== product.id));
    }
  };

  return (
    <Grid item xs={6} className="flex">
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          border: "1px solid gainsboro",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <Box sx={{ width: "100%" }}>
          <img
            src={product.image}
            alt=""
            style={{
              height: "140px",
              width: "100%",
              objectFit: "cover",
            }}
          />
        </Box>
        <Box
          sx={{
            padding: "10px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          <Typography sx={{ fontWeight: "700" }}>{product.name}</Typography>
          <Typography noWrap variant="body2">
            {product.malumot}
          </Typography>

          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"flex-end"}
            sx={{
              marginTop: "10px",
            }}
          >
            <Typography>{product.narx.toLocaleString("en-Us")} UZS</Typography>
            <div className="mt-2 btn-container">
              {count !== 0 ? (
                <div
                  className="flex items-center justify-between px-3 mx-auto"
                  style={{
                    border: "1px solid #EDEFF3",
                    borderRadius: "5px",
                    height: "35px",
                    width: "110px",
                    padding: "10px 5px",
                  }}
                >
                  <IconButton
                    sx={{ fontSize: "15px" }}
                    onClick={handleDecrement}
                  >
                    <FaMinus />
                  </IconButton>
                  <span
                    style={{
                      fontSize: "15px",
                      fontWeight: "bold",
                    }}
                    className={`${
                      count !== 0 ? "card__badge" : "card__badge--hidden"
                    }`}
                  >
                    {count}
                  </span>
                  <IconButton
                    sx={{ fontSize: "15px" }}
                    onClick={handleIncrement}
                  >
                    <FaPlus />
                  </IconButton>
                </div>
              ) : (
                <button
                  className="bg-[#20D472] hover:bg-[#36b16e]"
                  style={{
                    borderRadius: "5px",
                    color: "white",
                    width: "110px",
                    height: "35px",
                  }}
                  onClick={handleIncrement}
                >
                  <Typography variant="body2">Qo'shish</Typography>
                </button>
              )}
            </div>
          </Stack>
        </Box>
      </Box>
    </Grid>
  );
};
