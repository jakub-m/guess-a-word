import { ReactElement } from "react"
import { useSearchParamsValue } from "./useStateParamsHook"

const selectorKey = "p"

interface RouterProps {
  query: string
  element: ReactElement
}

/**
 * This query-based routing is needed to deploy the app to URL where we cannot control
 * the subpaths (e.g. GH pages via Jekyll).
 */
export const Route = ({query, element}: RouterProps) => {
  const selector = useSearchParamsValue(selectorKey, "")
  if (selector === query) {
    return element
  }
  return (<></>)
}