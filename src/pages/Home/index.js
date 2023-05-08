import Bar from "../../components/Bar";
const Home = () => {
  return (
    <div>
      <Bar
        title="框架使用人数"
        xData={["react", "vue", "angular"]}
        yData={[10, 20, 30, 40, 50]}
        style={{ width: "400px", height: "400px" }}
      />
    </div>
  );
};

export default Home;
