import Image from "next/image";
import { useRouter } from "next/router";

type HomeBannerProps = {
  onTap?: () => void;
};

const HomeBanner = (props: HomeBannerProps) => {
  const router = useRouter();
  return (
    <div className="relative h-screen flex justify-start items-center">
      <Image
        src="/bg_apto_pay.png"
        alt="Banner Image"
        layout="fill"
        objectFit="cover"
        className="absolute inset-0"
      />
      <div className="relative left-28 w-1/2 flex items-center justify-start pl-4">
        <button
          onClick={() => {
            router.push("/new");
          }}
          className="py-4 px-8 bg-white text-black rounded-full font-semibold shadow-lg hover:shadow-md transition duration-300"
        >
          Create new order
        </button>
      </div>
    </div>
  );
};

export default HomeBanner;
