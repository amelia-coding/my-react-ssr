import React, { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import tableStyle from '../assets/css/table.less';
import styles from './Home.less';

const Home: React.FC = () => {
  const ref = useRef(null);
  console.log(`-----isServer: ${process.env.SERVER}--`);
  useEffect(() => {
    const p = document.createElement('p');
    p.textContent = 'useEffect 触发生成';
    ref.current.append(p);
  }, []);

  return (
    <React.Fragment>
      <Helmet>
        <meta charSet="utf-8" name="description for home" />
        <title>Home</title>
      </Helmet>

      <div ref={ref} className={styles.home}>
        Home
        <button onClick={() => alert('1')}>弹窗</button>
      </div>
      <table className={tableStyle.tableList}>
        <tr className="tr"></tr>
      </table>
    </React.Fragment>
  );
};
export default Home;
