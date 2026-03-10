import { getImagePath } from "../../../utils/imagePaths";

export default function ResponsiveImage() {
  return (
    <div className="relative">
      <div className="overflow-hidden">
        <img
          src={getImagePath("/images/grid-image/image-01.png")}
          alt="Cover"
          className="w-full border border-gray-200 rounded-xl dark:border-gray-800"
        />
      </div>
    </div>
  );
}
