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
      {item.title} <b>{item.subtitle}</b>

              <span className="badge">
                New
              </span>
      </span>
      <span className="product-caption">
      {item.description}
            </span>
   
      
    </div>      </Text>

      
    </Flex>
  )
}

export default Review
