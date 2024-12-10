import { useState } from "react";
import { HttpGet } from "../core/store/httpHelper";

export const Home = () => {
  const [imageList, setImageList] = useState([]);

  const getImageList = async (event) => {
    event.preventDefault();
    try {
      let searchQuery = event.target.imgSearch.value;
      if (searchQuery) {
        let queryParams = {
          tags: searchQuery,
        };
        let conversionRates = await HttpGet(queryParams);
        setImageList(conversionRates?.photos?.photo);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const imgUrl = (imgData) => {
    return (
      "https://farm" +
      imgData?.farm +
      ".staticflickr.com/" +
      imgData?.server +
      "/" +
      imgData?.id +
      "_" +
      imgData?.secret +
      "_q.jpg"
    );
  };

  const downloadImg = (link) => {
    var url = link;
    var fileName = "image.jpg";
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "blob";
    xhr.onload = function () {
      var urlCreator = window.URL || window.webkitURL;
      var imageUrl = urlCreator.createObjectURL(this.response);
      var tag = document.createElement("a");
      tag.href = imageUrl;
      tag.download = fileName;
      document.body.appendChild(tag);
      tag.click();
      document.body.removeChild(tag);
      window.URL.revokeObjectURL(imageUrl);
    };
    xhr.send();
  };

  const ImgGallery = () => {
    return (
      !!imageList.length &&
      imageList.map((imgData) => {
        return (
          <div key={imgData.id} className="col col-lg-3">
            <div className="boxShadowClass">
              <div className="img-block">
                <div className="row w-100 m-0">
                  <div className="col col-lg-12 text-center">
                    <img src={imgUrl(imgData)} alt="" className="zoom" />
                  </div>
                </div>
                <div className="row w-100 m-0">
                  <div className="col col-lg-12 text-end">
                    <button
                      className="border-0 text-center bg-transparent"
                      download="image.jpg"
                      onClick={() => downloadImg(imgUrl(imgData))}
                    >
                      <span
                        className="mdi mdi-arrow-down-bold-circle-outline"
                        id="mdi"
                      ></span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })
    );
  };

  return (
    <>
      <div className="row w-100 m-0 p-2 srchblk">
        <form onSubmit={getImageList}>
          <div className="row w-100 m-0">
            <div className="col col-lg-10 ps-0">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span
                    className="input-group-text rounded-0 rounded-start"
                    id="img-search"
                  >
                    #
                  </span>
                </div>
                <input
                  name="imgSearch"
                  type="text"
                  className="form-control"
                  placeholder="Search for images"
                  aria-label="Search for images"
                  aria-describedby="img-search"
                  autoFocus
                />
              </div>
            </div>
            <div className="col col-lg-2 pe-0">
              <button className="btn btn-warning w-100" type="submit">
                Go
              </button>
            </div>
          </div>
          <div className="row">
            <ImgGallery />
          </div>
        </form>
      </div>
    </>
  );
};
