import { Route, Routes } from "react-router-dom"
import { Landing } from "./pages"
import "./App.css"

export const App = () => {
  return (
    <Routes>
        <Route path = "/" element = {<Landing />} />
    </Routes>
  )
}
