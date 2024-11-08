import { Button } from "antd";

export default function Home() {
  return (
    <div className="mt-20 flex justify-center gap-5">
      <Button type="primary">Primary Button</Button>
      <Button type="default">Primary Button</Button>
      <Button type="dashed">Primary Button</Button>
      <Button type="text">Primary Button</Button>
      <Button type="link">Primary Button</Button>
      <Button danger type="primary">
        Primary Button
      </Button>
    </div>
  );
}
