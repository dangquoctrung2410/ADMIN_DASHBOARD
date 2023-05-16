import React from "react";
import Tippy from "@tippyjs/react/headless"; // different import path!
import Wrapper from "../components/wrapper/Wrapper";
import "./TippyRender.css";
import SearchIcon from "@mui/icons-material/Search";
import { tokens } from "../theme";
import { Box, IconButton, useTheme } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import { searchUser } from "../services/getAllUsers";
import { useState, useEffect } from "react";
import useDebounce from "../Hook/useDebounce";

const RenderSearch = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [textSearch, setTextSearch] = useState("");
  const [result, setResult] = useState([]);

  const debouncedValue = useDebounce(textSearch, 300);

  useEffect(() => {
    if (debouncedValue.length > 0) {
      try {
        const Fetch = async () => {
          const Res = await searchUser(debouncedValue);
          if (Res.errCode === 0) {
            setResult(Res.data);
          }
        };
        Fetch();
      } catch {}
    }
  }, [debouncedValue]);
  console.log(result);

  return (
    <div>
      <Tippy
        interactive={true}
        render={(attrs) => (
          <div className="box" tabIndex="-1" {...attrs}>
            <Wrapper>
              <div className="content-render-search">
                {result.map((item, index) => {
                  return (
                    <div key={index} className="item-render-search">
                      <img
                        src="https://m.media-amazon.com/images/I/518YabTa8YL.jpg"
                        alt=""
                      />
                      <span>{item.lastName}</span>
                    </div>
                  );
                })}
              </div>
            </Wrapper>
          </div>
        )}
        visible={
          result.length > 0 ? (textSearch.length > 0 ? true : false) : false
        }
      >
        <Box
          display="flex"
          backgroundColor={colors.primary[400]}
          borderRadius="3px"
        >
          <InputBase
            sx={{ ml: 2, flex: 1 }}
            placeholder="Search Last Name ..."
            onChange={(e) => {
              setTextSearch(e.target.value);
            }}
            value={textSearch}
          />
          <IconButton type="button" sx={{ p: 1 }}>
            <SearchIcon />
          </IconButton>
        </Box>
      </Tippy>
    </div>
  );
};
export default RenderSearch;
