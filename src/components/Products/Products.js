
import ListItem from "./ListItems/ListItem"
import { useState,useEffect } from "react"
import axios from "axios"
import Loader from "../UI/Loader"
import { useLocation, useNavigate, useParams } from "react-router-dom"


const Products =()=>{
    const [items,setItems]=useState([])
    const[loader,setLoader]=useState(true)
    const params=useParams()
    const navigate=useNavigate()
    const {search}=useLocation()
    const queryParams=new URLSearchParams(search).get("search")

    useEffect(()=>{
        async function fetchItems(){
            try {
                let slug=`items.json`
                if(params.category){
                    slug=`items-${params.category}.json`
                    // items-category-1.json
                }
                if(queryParams){
                    slug+=`?search=${queryParams}`
                }
                
                const response=await axios.get(`https://react-guide-7b560-default-rtdb.firebaseio.com/${slug}`)
                const data=response.data
                if(!data){
                    handleNotFound();
                    return;
                }

                const transformedData=data.map((item,index)=>{

                    return {
                        ...item,
                        id:index
                    }

                })
                //setLoader(false)
                setItems(transformedData)
                
            } catch (error) {
                //setLoader(false);

                
                alert("Some error Occured")

                
            }
            finally{
                setLoader(false)
            }
            

        }
        fetchItems()
        return()=> {
            setItems([])
            setLoader(true)

        }

        
    },[params.category])

    const handleNotFound=()=>{
        navigate("/404")
    }


    return (
        <>
            <div className={"product-list"}>
                
                <div className={"product-list--wrapper"}>
                    {
                        items.map(item=>{
                            
                            return (<ListItem key={item.id} data={item} />)
                        })
                    }
                </div>

            </div>
            {loader && <Loader/> }
        </>
    )
}

export default Products