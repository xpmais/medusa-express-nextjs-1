import { Box, Flex, Select, Text, Input, Slider } from "@theme-ui/components"
import React, { useContext, useEffect, useMemo, useState } from "react"
import ProductContext from "../../../context/product-context"
import { formatVariantPrice } from "medusa-react"

const OptionSelector = ({ product, region}) => {
  const { quantity, updateQuantity, selectVariant } = useContext(ProductContext)
  const [options, setOptions] = useState([])
  const [selection, setSelection] = useState(JSON.stringify({}))

  let price = formatVariantPrice({
    variant: product.variants[0] ,
    region,
  })

  let cifra = "#"
  if (price?.includes("R$")) { price = price.replace("R$","").replace(",",""), cifra="R$"}
  if (price?.includes("$")) { price = price.replace("$","").replace(",",""), cifra="$"}
  if (price?.includes("€")) { price = price.replace("€","").replace(",",""), cifra="€"}



  useEffect(() => {
    const opts = []
    for (const option of product.options) {
      const opt = {
        title: option.title,
        id: option.id,
        values: [...new Set(option.values.map(v => v.value))],
      }
      opts.push(opt)
    }
    setOptions(opts)

    const select = {}
    for (const opt of opts) {
      select[opt.id] = opt.values[0]
    }
    setSelection(JSON.stringify(select))
  }, [product])

  const handleQuantity = e => {
    const quant = JSON.parse(e.target.value)
    updateQuantity(quant)
  }

  const handleSelect = e => {
    const pair = JSON.parse(e.target.value)
    const tmp = JSON.parse(selection)
    tmp[pair.option] = pair.value
    setSelection(JSON.stringify(tmp))
  }

  const createVariantSet = (options, variants) => {
    const set = []
    for (const variant of variants) {
      const optionSet = {}
      for (const option of variant.options) {
        const { id } = options.find(o => o.id === option.option_id)
        optionSet[id] = option.value
      }
      optionSet["variant"] = variant
      set.push(optionSet)
    }
    return set
  }

  const variantSet = useMemo(() => {
    if (product?.options && product?.variants) {
      return createVariantSet(product.options, product.variants)
    } else {
      return []
    }
  }, [product])

  useEffect(() => {
    const select = JSON.parse(selection)
    for (const variant of variantSet) {
      const keys = Object.keys(variant).filter(k => k !== "variant")
      let count = 0
      for (const key of keys) {
        count = select[key] === variant[key] ? count + 1 : 0
      }

      if (count === keys.length) {
        selectVariant(variant.variant)
      }
    }
  }, [selection])

  return (
    <Flex
      sx={{
        flexDirection: "column",
      }}
    >
      {options.map((o, i) => {
        return (
          <Flex
            key={i}
            sx={{
              flexDirection: "column",
              justifyContent: "space-between",
              pt: "16px",
              fontSize: "0.75em",
            }}
          >
            <Text sx={{ mb: "12px", fontWeight: "bold" }}>{o.title}</Text>
            <Select
              sx={{
                minWidth: "170px",
                height: "40px",
                border: "1px solid #E5E7EB",
                borderRadius: "4px",
                backgroundColor: "inherit",
                color: "#6B7280",
                outline: "none",
              }}
              arrow={
                <Box
                  as="svg"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="#6B7280"
                  sx={{
                    ml: -28,
                    alignSelf: "center",
                    pointerEvents: "none",
                  }}
                >
                  <path d="M7.41 7.84l4.59 4.58 4.59-4.58 1.41 1.41-6 6-6-6z" />
                </Box>
              }
              onChange={handleSelect}
            >
              {o.values.map((v, i) => {
                return (
                  <option
                    key={i}
                    value={JSON.stringify({ option: o.id, value: v })}
                  >
                    {v}
                  </option>
                )
              })}
            </Select>
          </Flex>
        )
      })}
      <Flex
        sx={{
          flexDirection: "column",
          justifyContent: "space-between",
          pt: "16px",
          fontSize: "0.75em",
        }}
      >
        <Text sx={{ mb: "12px", fontWeight: "bold" }}>Quantity</Text>


        
        <Flex
      sx={{
        flexDirection: "column",
        mb: ".75em",
        width: "100%",
      }}
    >
<Input

value={quantity * product.metadata.plus}
readOnly
sx={{
  minWidth: "170px",
  height: "40px",
  border: "1px solid #E5E7EB",
  borderRadius: "4px",
  backgroundColor: "inherit",
  color: "#6B7280",
  outline: "none",
}}

/>

<Slider 
        defaultValue={quantity || 1}
        onChange={handleQuantity}
        max={Number(product.metadata.max)}
        min={Number(product.metadata.min)}
        sx={{
    
          backgroundColor: "#f3f4f6",
          color: "#6e46eb",
          marginTop: "20px",

     
        }}
        
        />
<Flex sx={{ alignItems: "center", margin: "" }}>
              <Text sx={{ fontWeight: "light", color: "#9ba2ad" }}>1000K</Text>

              <Text sx={{ width: "90%", fontWeight: "light", color: "#9ba2ad" }}></Text>

              

              <Text sx={{ mr: "6px", fontWeight: "light", color: "#9ba2ad"}}>10000K</Text>

              </Flex>

    </Flex>

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

<div className="btn-group">


<span className="product-price">
<div className="price-card price-card-new"><span>{cifra}</span>{ price * quantity}<span>.00</span></div>


  </span>


</div>

         </Text>

        
      </Flex>
    </Flex>
  )
}

export default OptionSelector
