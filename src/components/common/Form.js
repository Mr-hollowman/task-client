export default function Form({data, setData, handleCreate}) {

    const handleChange = (e)=>{
        setData((prev)=>({...prev, [e.target.name]: e.target.value}))
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        handleCreate()
    }

    return (
        <form className="w-50" onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
                <input name="title" type="text" className="form-control" id="floatingInput" placeholder="Enter Title" onChange={handleChange} />
                <label for="floatingInput">Title</label>
            </div>
            <div className="form-floating mb-3">
                <textarea name="description" className="form-control" placeholder="Enter description" id="floatingTextarea2" style={{ "height": "100px" }} onChange={handleChange}></textarea>
                <label for="floatingTextarea2">Description</label>
            </div>
            <div className="form-floating mb-3">
                <select name="projectType" className="form-select" id="floatingSelect" aria-label="Floating label select example" onChange={handleChange}>
                    <option selected>Please select project type</option>
                    <option value="development">Development</option>
                    <option value="design">Design</option>
                    <option value="marketing">Marketing</option>
                </select>
                <label for="floatingSelect">Project Type</label>
            </div>
            <div className="form-floating mb-3">
                <input name="location" type="text" className="form-control" id="floatingInput" placeholder="Enter Location" onChange={handleChange} />
                <label for="floatingInput">Location</label>
            </div>
            <div className="d-flex justify-content-center align-items-center">
                <button type="submit" className="btn btn-primary">Submit</button>
            </div>
        </form>
    )
}
