import axios from "axios";
import { useState, useEffect } from "react";

function Main() {
  const [searchData, setSearchdata] = useState("");
  const [dataFromSever, setdataFromSever] = useState([]);
  const digitCount = (text) => {
    let lessThan100 = text.split("").slice(0, 99).join("") + "...";
    return lessThan100;
  };
  const getSearchDataFromSever = async (searchText) => {
    try {
      const result = await axios.get(
        `http://localhost:4001/trips?keywords=${searchText}`
      );
      setdataFromSever(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getDataFromSever = async () => {
    try {
      const result = await axios.get("http://localhost:4001/trips?keywords=");
      console.log(result.data.data);
      setdataFromSever(result.data.data);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    getDataFromSever();
  }, []);
  useEffect(() => {
    getSearchDataFromSever(searchData);
  }, [searchData]);

  return (
    <section className="h-screen w-[full] flex flex-col justify-start items-center">
      <div className="w-[1440px] flex flex-col justify-center items-center">
        {/* input section */}
        <div className="pt-[2%] pb-[1%] w-[80%] ">
          <h1 className="text-center text-[#438dd6] font-extrabold text-6xl pb-12">
            เที่ยวไหนดี
          </h1>
          <p className=" text-start font-bold text-xl pb-8">ค้นหาที่เที่ยว</p>
          <input
            type="text"
            placeholder="หาที่เที่ยวแล้วไปกัน ..."
            className="text-xl text-center w-full border-b-2"
            value={searchData}
            onChange={(e) => setSearchdata(e.target.value)}
          />
        </div>
        {/* Card section */}

        {dataFromSever.map((item, index) => {
          return (
            <div className="w-[100%]" key={index}>
              <div className="h-[400px] gap-[50px] flex flex-row mt-[2%] mb-[1%]">
                {/* Card Image */}
                <div className=" bg-red-500 h-full basis-1/3 rounded-[10%] overflow-hidden">
                  <img
                    src={item.photos[0]}
                    alt="image"
                    className=" size-full object-cover"
                  />
                </div>
                {/* Card Text*/}
                <div className=" h-full basis-2/3 flex flex-col justify-start p-1 max-h-[400px]">
                  <div className="basis-1/2">
                    <h2 className="text-4xl pb-4 pt-2 font-bold">
                      {item.title}
                    </h2>
                    <p className="text-xl pb-2 over">
                      {digitCount(item.description)}
                    </p>
                    <p className="text-xl pb-2 hover:cursor-pointer underline text-[#438dd6]" onClick={()=>window.open(item.url, "_blank")}>
                      อ่านต่อ
                    </p>
                    <p className="text-xl pb-2">
                      หมวด :{" "}
                      {item.tags.map((tag, index) => {
                        return <span className="underline px-2">{tag}</span>;
                      })}
                    </p>
                  </div>
                  <div className="flex flex-row gap-[40px] basis-1/2 p-2">
                    <div className="bg-white min-h-[168px] w-[20%] rounded-2xl overflow-hidden">
                      <img
                        src={item.photos[1]}
                        alt="image"
                        className=" size-full object-cover"
                      />
                    </div>
                    <div className="bg-white min-h-[168px] w-[20%] rounded-2xl overflow-hidden">
                      <img
                        src={item.photos[2]}
                        alt="image"
                        className=" size-full object-cover"
                      />
                    </div>
                    <div className="bg-white min-h-[168px] w-[20%] rounded-2xl overflow-hidden">
                      <img
                        src={item.photos[3]}
                        alt="image"
                        className=" size-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Main;
