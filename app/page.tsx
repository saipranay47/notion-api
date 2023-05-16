'use client'

import Head from 'next/head';
import styles from './page.module.css'

const fetchNotionDb = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getData`);
    if (res.ok) {
      const data = await res.json();
      return data;
    } else {
      console.log('Error fetching data', res);
      return null;
    }
}


export default async function Home() {

  const data: rowsStructured = await fetchNotionDb()
  console.log(data)


  return (
    <main className={styles.main}>
      <title>Notion DB</title>
      <Head>
        <meta name="description" content="Notion DB" />
      </Head>

      {data === null ? <h1>Failed to fetch data</h1> :
        <div>
          <h1>Notion DB</h1>
          <br />
          <p>Data displayed below is fetched form <a target='_blank' href="https://imminent-crepe-93a.notion.site/dc39c4a089044d59a6e49be738aca6c6?v=ee84a38e2b024085b90bb5c68b2511f6">here</a> using Notion as database</p>
          <p>API is hosted at <a target='_blank' href="/api/getData">/api/getData</a></p>
          <br />
          <table>
            <thead>
              <tr>
                <th>Username</th>
                <th>Creator Name</th>
                <th>Link</th>
              </tr>
            </thead>

            <tbody>
              {data.map((row, index) => (
                <tr key={index}>
                  <td>{row.username}</td>
                  <td>{row.creator_name}</td>
                  {/* <td>{row.link}</td> */}
                  <td><a target='_blank' href={`https://${row.link}`}>{row.link}</a></td>
                </tr>
              ))}
            </tbody>
          </table>
          <br />
          <br />
        </div>
      }

    </main>
  )
}
