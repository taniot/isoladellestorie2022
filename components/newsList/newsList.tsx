import { v4 as uuidv4 } from "uuid";
import NewsLight from "../news/newsLight";
import styles from "./newsList.module.scss";

const NewsList = ({ data }: { data: any }) => {
  return (
    <div className={styles.container}>
      {!data && <div>No news found</div>}

      {data.map((news: any) => {
        return <NewsLight key={uuidv4()} data={news} />;
      })}
    </div>
  );
};

export default NewsList;
