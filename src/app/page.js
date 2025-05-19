"use client"
import React, { useState, useEffect, useCallback } from "react";
import ScrollTriggered from "./components/scrolltriggered";
import { FontType, SUPABASE_URL_WECARE, API_KEY_WECARE } from "./supabase";
import { createClient } from "@supabase/supabase-js";
import LoadingThreeDotsJumping from "./components/loading";

const supabase = createClient(SUPABASE_URL_WECARE, API_KEY_WECARE);

export default function Home() {
  const [Data, setData] = useState([]);

  // Memoized getInstruments function
  const getInstruments = useCallback(async () => {
    let query = supabase.from("products").select();
    const { data } = await query;
    setData(data);
  }, []);

  useEffect(() => {
    getInstruments();
  }, [getInstruments]);

  return (
    <React.Fragment>
      <div className="mt-12 block align-center justify-center" >
        {Data.length === 0 ?
          <div style={{ minWidth: "100vw", marginTop: "40vh" }} className="flex">
            <div
              className="mx-auto">
              <LoadingThreeDotsJumping />
            </div>
          </div> :
          <>
            <div style={{ fontFamily: FontType }} className="text-left text-xl ml-2 text-cyan-950">New Arivals</div>
            <ScrollTriggered Data={Data} />
          </>}
      </div>
    </React.Fragment>
  );
}
