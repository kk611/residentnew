import React, { Component } from 'react';

class LoaderOverlay extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( <React.Fragment>
<div class="loading-overlay">
  <span class="fas fa-spinner fa-3x fa-spin"></span>
</div>

        </React.Fragment> );
    }
}
 
export default LoaderOverlay;