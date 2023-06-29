import React from 'react';
import Navbar from './global-components/navbar';
import PageHeader from './global-components/page-header';
import AddNew from './section-components/add-new';
import Footer from './global-components/footer';

const AddProperty = (props) => {
    return <div>
        <Navbar />
        <PageHeader headertitle="Add Property" />
        <AddNew props={props} />
        <Footer />
    </div>
}

export default AddProperty

