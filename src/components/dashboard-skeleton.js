import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
function Skeleton() {
  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 34,
      }}
      spin
    />
  );
  return (
    <div className="flex h-screen w-full justify-center items-center">
      <Spin className="mb-12" indicator={antIcon} />
    </div>
  );
}
export default Skeleton;
