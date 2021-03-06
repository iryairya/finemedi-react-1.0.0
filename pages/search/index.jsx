import React, { useEffect } from "react";
import Container from "~/components/layouts/Container";
import BreadCrumb from "~/components/elements/BreadCrumb";
import Shop from "~/components/partials/shop/Shop";
import SidebarShop from "~/components/shared/sidebar/SidebarShop";
import PromotionSecureInformation from "~/components/shared/sections/PromotionSecureInformation";
import useGetProducts from "~/hooks/useGetProducts";
import useProductGroup from "~/hooks/useProductGroup";
import { useRouter } from "next/router";

const breadcrumb = [
    {
        id: 1,
        text: "Home",
        url: "/",
    },
    {
        id: 2,
        text: "Shop",
        url: "/shop",
    },
    {
        id: 3,
        text: "Search result",
    },
];

const SearchResultScreen = () => {
    const Router = useRouter();
    const { keyword } = Router.query;
    const { loading, productItems, getProducts } = useGetProducts();
    const { withGrid } = useProductGroup();

    useEffect(() => {
        const queries = {
            name_contains: keyword,
        };
        getProducts(queries);
    }, [keyword]);

    let products;
    if (productItems && productItems.length > 0) {
        products = withGrid(productItems, loading, 4);
    } else {
        products = <p>No product found.</p>;
    }

    return (
        <Container title={`Search result for: ${keyword}`}>
            <div className="ps-page ps-page--shopping">
                <div className="container">
                    <div className="ps-page__header">
                        <BreadCrumb breacrumb={breadcrumb} />
                        <h1 className="ps-page__heading">
                            Search result: “{keyword}”
                        </h1>
                    </div>
                    <div className="ps-page__content">
                        <div className="ps-layout--with-sidebar">
                            <div className="ps-layout__left">
                                <SidebarShop />
                            </div>
                            <div className="ps-layout__right">
                                <Shop classes="ps-shop--grid">{products}</Shop>
                                <PromotionSecureInformation />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default SearchResultScreen;
