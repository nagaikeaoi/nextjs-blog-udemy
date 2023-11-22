import Layout, { siteTitle } from "@/components/Layout";
import Head from "next/head";
import Link from "next/link";

import styles from "../styles/Home.module.css";
import utilStyle from "../styles/utils.module.css";
import { getPostsData } from "../lib/post";

// SSGの場合
export async function getStaticProps() {
  const allPostsData = getPostsData(); // id, title, data, thumbnail

  return {
    props: {
      allPostsData,
    },
  };
}

// SSRの場合
// export async function getServerSideProps(context) {
//   return {
//     props: {
//       // コンポーネントに渡すためのprops
//     },
//   };
// }

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyle.headingMd}>
        <p>私はフロントエンジニアです</p>
      </section>

      <section>
        <h2>📝エンジニアのブログ</h2>
        <div className={styles.grid}>
          {allPostsData.map(({ id, title, data, thumbnail }) => (
            <article key={id}>
              <Link href={`/posts/${id}`}>
                <img src={`${thumbnail}`} className={styles.thumbnailImage} />
              </Link>
              <Link href={`/posts/${id}`} legacyBehavior>
                <a className={utilStyle.boldText}>{title}</a>
              </Link>
              <small className={utilStyle.lightText}>{data}</small>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
}
