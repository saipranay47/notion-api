import { Client } from "@notionhq/client"

const notionSecret = process.env.NOTION_SECRET
const notionDatabaseId = process.env.NOTION_DATABASE_ID

const notion = new Client({ auth: notionSecret })

type Row  = {
    creator_name: {id : string, rich_text: {text : {content : string}}[]},
    username: {id : string, title: {text : {content : string}}[]},
    link: {id : string, url: string},
}

export async function GET (request : Request){

    if(!notionSecret || !notionDatabaseId){
        return new Response('Notion secret or database id is missing', {status: 500})
    }

    const query = await notion.databases.query({ database_id: notionDatabaseId })
    
    // @ts-ignore
    const rows = query.results.map((res) => res.properties) as Row[]

    const rowsStructured : rowsStructured = rows.map((row) => {
        return {
            creator_name: row.creator_name.rich_text[0].text.content,
            username: row.username.title[0].text.content,
            link: row.link.url
        }
    })

    return new Response(JSON.stringify(rowsStructured), {status: 200})
}