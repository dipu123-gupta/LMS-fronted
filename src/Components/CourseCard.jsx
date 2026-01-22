import React from "react";
import { useNavigate } from "react-router-dom";

const CourseCard = ({ data }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/course/description/${data?._id}`)}
      className="text-white w-[22rem] h-[430px] rounded-lg cursor-pointer group overflow-hidden bg-zinc-700 hover:shadow-lg transition-all"
    >
      <div className="overflow-hidden">
        <img
          src={data?.thumbnail?.secure_url}
          alt={data?.title}
          className="h-48 w-full object-cover rounded-t-lg group-hover:scale-110 transition-transform duration-300"
        />
      </div>

      <div className="p-3 space-y-1">
        <h2 className="text-xl font-bold text-yellow-500 line-clamp-2">
          {data?.title}
        </h2>

        <p className="line-clamp-2 text-sm text-gray-200">
          {data?.description}
        </p>

        <p className="font-semibold text-sm">
          <span className="text-yellow-500 font-bold">Category: </span>
          {data?.category}
        </p>

        <p className="font-semibold text-sm">
          <span className="text-yellow-500 font-bold">Total Lectures: </span>
          {data?.numberOfLectures}
        </p>

        <p className="font-semibold text-sm">
          <span className="text-yellow-500 font-bold">Instructor: </span>
          {data?.createdBy}
        </p>
      </div>
    </div>
  );
};

export default CourseCard;
