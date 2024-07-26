import { Flex, Image, Text } from "@theme-ui/components"
import React, { useMemo } from "react"

const Review = ({ cart }) => {
  const item = useMemo(() => {
    return cart.items[0]
  }, [cart.items])

  return (
    <Flex
      sx={{
        alignItems: "top",
      }}
    >
      
      <Image
          sx={{
            width: "100%",
            borderStartEndRadius: "10px",
            borderStartStartRadius: "10px",
            objectFit: "contain",
            objectPosition: "center center",
            clipPath: "polygon(0 0, 0 100%, 100% 75%, 100% 0%)",
            boxShadow: "0px 0px 5px 2px rgba(0, 0, 0, 0.1)",

          }}
          src={"/elden-ring.webp"}
          alt={product.title}
        />
     
      <Text
        sx={{
          mt: "16px",
          lineHeight: "24px",
          fontSize: "14px",
          fontWeight: 300,
          color: "#6B7280",
        }}
        variant="fz_s"
      >
    <div className="product-desc">
      <span className="product-title">
      {product.title} <b>{product.subtitle}</b>

              <span className="badge">
                New
              </span>
      </span>
      <span className="product-caption">
      {product.description}
            </span>
   
      
    </div>      </Text>

    </Flex>
  )
}

export default Review
