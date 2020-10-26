
import { useResponsive } from "@umijs/hooks";
import { createModel } from "hox";

function useMedia() {
  // 使用默认配置，如需修改
  // configResponsive({
  //   small: 0,
  //   middle: 800,
  //   large: 1200,
  // });

  const responsive = useResponsive();
  const isMobile = responsive.md === false;
  return isMobile
}
export default createModel(useMedia);
