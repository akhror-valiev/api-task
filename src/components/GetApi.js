import React, { Component } from "react";

class GetApi extends Component {
	constructor(props) {
		super(props);

		this.state = {
			info: [],
			search: "",
            selectedPage:"",
		};
	}

	componentDidMount() {
		fetch(
			"https://staging-backend.esyms-api.com/esyms/website/product/front-condition?categoryId=&name=%20"
		)
			.then((response) => response.json())
			.then((data) => {
				console.log(data);

				this.setState({ info: data.results.docs });
				console.log(this.state.info);
			});
	}

    handleChange = (event) =>{
        this.setState({selectedPage:event.target.value})
        var pages = []
        for (var page of this.state.info){
            if (event.target.value == page.price){
                pages.push(page)
            }
        }
        this.setState({info:pages})
    }

    searchHandle = (event)=>{
        var doc = [];
        for(var list of this.state.info){
            if(list.price.toString().includes(event.target.value)){
        
            doc.push(list)
        }
        
        this.setState({info:doc})
    }
    }

   

	
	render() {
		return (
			<div>
                    
                    <label for="cars">Choose Based on Price:</label>

                    <select value={this.state.info} onChange={this.handleChange}>
                    {this.state.info.map((item)=>{
                        return <option>{item.price}</option>
                    })}
                    </select>
                     
                    
                    <input
					type="text"
					placeholder="Search..."
					onChange={this.searchHandle}
                    
				/>
                

				<table>
					<tr>
						<th>ID</th>
						<th>Price</th>
						<th>Product ID</th>
						<th>Speacial Price</th>
						<th>Rating</th>
						<th>Images</th>
						<th>Image Sort Order</th>
						<th>Image ID</th>
					</tr>

					{this.state.info.map((item) => {
						return (
							<tr>
								<td>{item._id}</td>
								<td>{item.price}</td>
								<td>{item.productId}</td>
								<td>{item.specialPrice}</td>
								<td>{item.rating}</td>
								<td>
									{item.img.map((i) => {
										return <img src={i.src} alt="no photo" />;
									})}
								</td>
								<td>
									{item.img.map((i) => {
										return <>{i.sortOrder}</>;
									})}
								</td>
								<td>
									{item.img.map((i) => {
										return <>{i._id}</>;
									})}
								</td>
							</tr>
						);
					})}
				</table>
			</div>
		);
	}
}

export default GetApi;
