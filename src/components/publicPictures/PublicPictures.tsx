import React from "react";
import { getPictures } from "../publicPictures/publicPicturesSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useState, useEffect } from "react";
import {ReactComponent as Spinner} from "../../assets/images/spinner.svg"
import { constans } from "../../constans/constans";
import { PicInfo } from "../../interfaces";

const PublicPictures = () => {
  const dispatch = useAppDispatch();
  const { pictures, loadingStatus, error } = useAppSelector((state) => state.publicPicturesSlice);
  const [userFilter, setUserFilter] = useState<string>("");

  useEffect(() => {
    dispatch(getPictures());
  }, []);

  const changeUser = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserFilter(e.target.value);
  };

  if (error) {
    return <h2>{constans.wentWrong}</h2>;
  }

  if (loadingStatus) {
    return <h2><Spinner/></h2>;
  }

  return (
    <>
      <select value={userFilter} onChange={changeUser}>
        <option value="">All users</option>
        {Object.keys(pictures)?.map((item: string) => {
          return (
            <option value={item} key={item}>
              {item}
            </option>
          );
        })}
      </select>

      {userFilter
        ? pictures?.[userFilter].slice(0, 10).map((item: PicInfo) => {
            return <img src={item.img} alt={item.id} key={item.id}></img>;
          })
        : Object.values(pictures)
            .slice(0, 10)
            .flat()
            .sort((a: PicInfo, b: PicInfo) => b.createdAt - a.createdAt)
            .map((item: PicInfo) => {
              return <img src={item.img} alt={item.id} key={item.id}></img>;
            })}
    </>
  );
};

export default PublicPictures;
