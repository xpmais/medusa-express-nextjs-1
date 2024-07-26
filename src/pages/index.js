import Head from "next/head"
import Image from "next/image"
import { useRouter } from "next/router"
import * as React from "react"
import { Button, Card, Flex, Text } from "theme-ui"
import CodeSnippet from "../components/code-snippet"
import Layout from "../components/layout/layout"
import { client } from "../utils/client"
const { loadIntercom, initIntercomWindow } = require("next-intercom");

const IndexPage = ({ product }) => {
  const router = useRouter()

  const intercomID = 'zq6qqsdr'
          loadIntercom({
        
        
            appId: intercomID, // default : ''
            email: "", //default: ''
            name: "", //default: RandomName
            ssr: false, // default: false
            initWindow: true, // default: true
            delay: 0, // default: 0  - usefull for mobile devices to prevent blocking the main thread
          });

  return (
    <main>
      <Head>
        <title>xpmais.com</title>
        <meta name="description" content="One-page checkout" />
      </Head>
      <Layout>
        <Card variant="container">



          <Flex sx={{ flexDirection: "column" }}>
            <Text
              sx={{
                mb: "16px",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                pb: "16px",
                borderBottom: "1px solid #E5E7EB",
              }}
            >
              <Image src={"/logo.svg"} width={42} height={42} />
            </Text>
            <Text variant="heading3" sx={{ mb: "16px" }}>
              Welcome!
            </Text>
            
            <div className="card" onClick={() => router.push(`/${product.handle}`)}>
  <div className="card-body">
  <img src="/elden-ring.webp" alt="" />

    <div className="row">

      
    <div className="product-desc">
      <span className="product-title">
      Elden Ring <b>Runes</b>

              <span className="badge">
                New
              </span>
      </span>
      <span className="product-caption">
      {product.description}
            </span>
   
      
    </div>

      
      
    </div>
    <hr className="hr"/>
    
    <div className="row">

      <div className="card-title">
        <h4>From</h4>
      </div>
      
      <div className="btn-group">


      <span className="product-price">
      <div className="price-card price-card-new"><span>$</span> 1<span>.00</span></div>


        </span>


    </div>
      
    </div>
  </div>


  
  </div>
          </Flex>
        </Card>
      </Layout>
    </main>
  )
}

export async function getStaticProps({ params }) {
  const response = await client.products.list({ limit: 1 })

  const [product, ...rest] = response.products

  return { props: { product } }
}

export default IndexPage
