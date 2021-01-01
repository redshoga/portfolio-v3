// parseSizedImage("http://example.com/image.png#width:100,height:100")
// ↓
// { baseSrc: "http://example.com/image.png", size: { width: 100, height: 100 }　}
export const parseSizedImage = (
  imageSrc: string
): {
  baseSrc: string;
  size?: {
    width: number;
    height: number;
  };
} => {
  const [baseSrc, sizeParamsString, ..._] = imageSrc.split("#");

  // パラメータがない場合
  if (!sizeParamsString) {
    return { baseSrc };
  }

  // パラメータをparse
  const cleanedParamsString = sizeParamsString.replace(/[ \n]+?/g, "");
  const width = keyColonNumParser("width", cleanedParamsString);
  const height = keyColonNumParser("height", cleanedParamsString);

  // パラメータが正しくあった場合
  if (width && height) {
    return {
      baseSrc,
      size: {
        width,
        height,
      },
    };
  }

  return { baseSrc };
};

// keyColonNumParser("width", "width:100,height:100")
// ↓
// 100
const keyColonNumParser = (
  key: string,
  paramString: string
): undefined | number => {
  const params = paramString.split(",");
  const param = params.find((param) => param.split(":")[0] === key);
  if (param === undefined) return undefined;
  return Number(param.split(":")[1]);
};
