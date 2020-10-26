import { Spin } from "antd";

export default (props) => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      alignContent: "center",
      margin: "auto",
      paddingTop: 100,
      textAlign: "center"
    }}
  >
    <Spin size="large" {...props} />
  </div>
)
