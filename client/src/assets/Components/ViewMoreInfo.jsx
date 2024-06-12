import { useParams } from "react-router-dom"

function ViewMoreInfo() {
  const params = useParams()
  return(
    <h1>View More Infomation {params.keyword}</h1>
  )
}
export default ViewMoreInfo