import axios from "axios";
import { useState, useEffect } from "react";

function Main() {
  const [searchData, setSearchdata] = useState("");
  const [dataFromSever, setdataFromSever] = useState([]);
  const [getTag, setGetTag] = useState([]);
  let selectedTag = getTag;
  let count = [];

  /* Function */
  /* Function 1: Cut Text within 100 digit */
  const digitCount = (text) => {
    let lessThan100 = text.split("").slice(0, 99).join("") + "...";
    return lessThan100;
  };
  /* Function 2: Get search data from sever */
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
  /* Function 3: Get all data from sever */
  const getDataFromSever = async () => {
    try {
      const result = await axios.get("http://localhost:4001/trips?keywords=");
      setdataFromSever(result.data.data);
    } catch (error) {
      alert(error);
    }
  };
  /* Function 4: Filter data by tags */
  const searchByTags = () => {
    let totalData = dataFromSever.map((tagName) => tagName.tags);
    let checkData = getTag;

    for (let i in checkData) {
      count = [];
      for (let x in totalData) {
        if (totalData[x].includes(checkData[i])) {
          count.push(dataFromSever[x]);
        }
      }
    }
    setdataFromSever(count);
  };
  /* Use Effect */
  useEffect(() => {
    getDataFromSever();
  }, []);
  useEffect(() => {
    getSearchDataFromSever(searchData);
  }, [searchData]);
  useEffect(() => {
    searchByTags();
    console.log("Hello");
  }, [getTag]);

  return (
    <section className="h-screen w-[full] flex flex-col justify-start items-center ">
      <div
        iv
        className="w-[80%] min-w-[970px] max-w-[1440px] flex flex-col justify-center items-center max-[768px]:min-w-[500px]"
      >
        {/* input section */}
        <div className="pt-[4%] pb-[1%] w-[100%] sticky top-0 bg-white z-10 flex flex-col justify-center items-center ">
          <h1 className="text-center text-[#438dd6] font-extrabold text-6xl pb-12">
            เที่ยวไหนดี
          </h1>
          <p className=" text-start font-bold text-xl pb-6 w-[80%]">
            ค้นหาที่เที่ยว
          </p>
          <input
            type="text"
            placeholder="หาที่เที่ยวแล้วไปกัน ..."
            className="text-xl text-center w-[80%] border-b-2 content-center"
            value={searchData}
            onChange={(e) => setSearchdata(e.target.value)}
          />
          {/* Tags section */}
          <div className="flex flex-row h-[50px] justify-center items-center mt-[1%] gap-5">
            <h2>Tag ในการค้นหา : </h2>
            {getTag.map((tagName, index) => {
              return (
                <div
                  key={index}
                  className=" bg-[#438dd6] flex flex-row pl-2 gap-2 rounded-xl overflow-hidden"
                >
                  <p>{tagName}</p>
                  <button
                    className=" bg-orange-400 w-[20px] hover:bg-orange-600 text-center"
                    id={index}
                    onClick={(e) => {
                      let dummy = [...getTag];
                      if (dummy.length === 1) {
                        setGetTag([]);
                        getDataFromSever();
                      } else {
                        dummy.splice(index, 1);
                        setGetTag(dummy);
                      }
                    }}
                  >
                    x
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Card section */}
        {dataFromSever.map((item, index, array) => {
          return (
            <div
              className="w-[100%] flex flex-col justify-center items-center max-[768px]:border-2 max-[768px]:px-4 max-[768px]:pt-4 max-[768px]:mb-4 rounded-2xl"
              key={index}
            >
              <div className="h-[400px] w-full max-w-[1440px] gap-[50px] flex flex-row mt-[1%] mb-[1%] max-[768px]:flex-col max-[768px]:h-[700px] max-[768px]:w-[100%] max-[768px]:gap-[10px] max-[768px]:items-center ">
                {/* Card Image */}
                <div className=" h-full min-w-[300px] basis-1/3 rounded-[10%] overflow-hidden max-[768px]:w-[80%] max-[768px]:max-w-[320px]">
                  <img
                    src={item.photos[0]}
                    alt="image"
                    className=" size-full object-cover "
                  />
                </div>
                {/* Card Text*/}
                <div className=" h-full basis-2/3 flex flex-col justify-start p-1 max-h-[400px] relative">
                  <div className="basis-1/2">
                    <h2 className="text-4xl pb-4 pt-2 font-bold max-[768px]:text-xl">
                      {item.title}
                    </h2>
                    <p className="text-xl pb-2 over max-[768px]:text-lg">
                      {digitCount(item.description)}
                    </p>
                    <p className="text-xl pb-2  underline text-[#438dd6] max-[768px]:text-lg">
                      <span
                        className="hover:cursor-pointer"
                        onClick={() => window.open(item.url, "_blank")}
                      >
                        อ่านต่อ
                      </span>
                    </p>
                    <p className="text-xl pb-2 max-[768px]:text-lg">
                      หมวด :{" "}
                      {item.tags.map((tag, index) => {
                        return (
                          <button
                            className="underline px-2 hover:text-[#438dd6]"
                            key={tag}
                            id={tag}
                            onClick={(e) => {
                              selectedTag.push(e.target.getAttribute("id"));
                              setGetTag([...selectedTag]);
                            }}
                          >
                            {tag}
                          </button>
                        );
                      })}
                    </p>
                  </div>
                  <div className="flex flex-row gap-[40px] basis-1/2 p-2 max-[768px]:gap-[10px] max-[768px]:justify-start max-[768px]:p-[0px] max-[768px]:justify-center">
                    <div className="bg-white  w-[20%] min-w-[150px] rounded-2xl overflow-hidden max-[768px]:w-[25%] max-[768px]:h-[60%] ">
                      <img
                        src={item.photos[1]}
                        alt="image"
                        className=" size-full object-cover"
                      />
                    </div>
                    <div className="bg-white  w-[20%] min-w-[150px] rounded-2xl overflow-hidden max-[768px]:w-[25%] max-[768px]:h-[60%] ">
                      <img
                        src={item.photos[2]}
                        alt="image"
                        className=" size-full object-cover"
                      />
                    </div>
                    <div className="bg-white  w-[20%] min-w-[150px] rounded-2xl overflow-hidden max-[768px]:w-[25%]  max-[768px]:h-[60%]">
                      <img
                        src={item.photos[3]}
                        alt="image"
                        className=" size-full object-cover"
                      />
                    </div>
                  </div>
                  <button
                    className=" size-12 absolute right-2 bottom-2 rounded-full border-3xl border-2 p-2 border-[#438dd6]"
                    onClick={() => {
                      navigator.clipboard.writeText(item.url);
                      alert("Link coppied!");
                    }}
                  >
                    <svg
                      className=""
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 640 512"
                    >
                      <path
                        fill="#438dd6"
                        d="M579.8 267.7c56.5-56.5 56.5-148 0-204.5c-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6c31.5 31.5 31.5 82.5 0 114L422.3 334.8c-31.5 31.5-82.5 31.5-114 0c-27.9-27.9-31.5-71.8-8.6-103.8l1.1-1.6c10.3-14.4 6.9-34.4-7.4-44.6s-34.4-6.9-44.6 7.4l-1.1 1.6C206.5 251.2 213 330 263 380c56.5 56.5 148 56.5 204.5 0L579.8 267.7zM60.2 244.3c-56.5 56.5-56.5 148 0 204.5c50 50 128.8 56.5 186.3 15.4l1.6-1.1c14.4-10.3 17.7-30.3 7.4-44.6s-30.3-17.7-44.6-7.4l-1.6 1.1c-32.1 22.9-76 19.3-103.8-8.6C74 372 74 321 105.5 289.5L217.7 177.2c31.5-31.5 82.5-31.5 114 0c27.9 27.9 31.5 71.8 8.6 103.9l-1.1 1.6c-10.3 14.4-6.9 34.4 7.4 44.6s34.4 6.9 44.6-7.4l1.1-1.6C433.5 260.8 427 182 377 132c-56.5-56.5-148-56.5-204.5 0L60.2 244.3z"
                      />
                    </svg>
                  </button>
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
