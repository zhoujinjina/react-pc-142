import Bar from "../../components/Bar";
import { useEffect, useState } from "react";
import { http } from "../../utils";
import Loading from "../../components/Loading";

const Home = () => {
  // 246810
  const [loading, setLoading] = useState();
  const [statuscount, setStatusCount] = useState([]);
  useEffect(() => {
    const loadList = async () => {
      try {
        setLoading(true);
        const res = await http.get("/mp/articles");
        console.log("发送请求" + res);
        const { results, total_count } = res.data;
        const list = results.map((item) => item.status); //状态数组
        console.log(list);
        const statusArr = new Array(4).fill(0);
        for (let i of list) {
          switch (i) {
            case 0:
              statusArr[0] += 1;
              break;
            case 1:
              statusArr[1] += 1;
              break;
            case 2:
              statusArr[2] += 1;
              break;
            case 3:
              statusArr[3] += 1;
              break;
            case 4:
              statusArr[4] += 1;
              break;
            default:break;
          }
        }
        setStatusCount([total_count, ...statusArr]);
        setLoading(false);
      } catch (error) {}
    };

    loadList();
  }, []);
  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      <Bar
        title="文章概览"
        type="文章数量"
        xData={["全部", "草稿", "待审核", "审核通过", "审核失败"]}
        yData={statuscount[0]>0?statuscount:[20,4,5,9,2]}
        style={{ width: "400px", height: "400px" }}
      />
    </div>
  );
};

export default Home;
