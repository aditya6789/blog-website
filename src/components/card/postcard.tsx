import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
interface IPostCard {
  title: string;

  date: string;
  imageData?: {
    contentType: string;
    data: {
      data: number[];
      type: string;
    };
  };
}


const Postcard = ({ title, date , imageData }: IPostCard) => {
  if (!imageData) {
    return <div>No image data provided</div>;
  }

  const { contentType, data } = imageData;

  // Convert binary image data to base64 string
  const base64ImageData = `data:${contentType};base64,${btoa(
    data.data.reduce((acc, byte) => acc + String.fromCharCode(byte), '')
  )}`;

  return (
    <Card>
      <CardHeader>
        <img
          className="h-full max-w-[300px]"
         src={base64ImageData}
          alt=""
        />
      </CardHeader>
      <CardContent>
        <h1 className="text-black font-semibold text-lg w-[300px]">{title}</h1>
      </CardContent>

      <CardFooter>
        <p>{date}</p>
      </CardFooter>
    </Card>
  );
};

export default Postcard;
