import React, { useEffect, useRef } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import Aos from "aos";
import "aos/dist/aos.css";
import "./Earth.css";

const Earth = () => {
    const chartRef = useRef(null);

    useEffect(() => {
        let root = am5.Root.new(chartRef.current);
        Aos.init({ duration: 2000 });
        root.setThemes([am5themes_Animated.new(root)]);

        // Disable the logo
        root._logo.dispose();

        let chart = root.container.children.push(
            am5map.MapChart.new(root, {
                panX: "rotateX",
                panY: "rotateY",
                projection: am5map.geoOrthographic(),
                paddingBottom: 20,
                paddingTop: 20,
                paddingLeft: 20,
                paddingRight: 20,
            })
        );

        let polygonSeries = chart.series.push(
            am5map.MapPolygonSeries.new(root, {
                geoJSON: am5geodata_worldLow,
            })
        );

        polygonSeries.mapPolygons.template.setAll({
            tooltipText: "{name}",
            toggleKey: "active",
            interactive: true,
        });

        polygonSeries.mapPolygons.template.states.create("hover", {
            fill: root.interfaceColors.get("primaryButtonHover"),
        });

        polygonSeries.mapPolygons.template.states.create("active", {
            fill: root.interfaceColors.get("primaryButtonHover"),
        });

        let backgroundSeries = chart.series.push(
            am5map.MapPolygonSeries.new(root, {})
        );
        backgroundSeries.mapPolygons.template.setAll({
            fill: root.interfaceColors.get("alternativeBackground"),
            fillOpacity: 0.1,
            strokeOpacity: 0,
        });

        backgroundSeries.data.push({
            geometry: am5map.getGeoRectangle(90, 180, -90, -180),
        });

        let graticuleSeries = chart.series.unshift(
            am5map.GraticuleSeries.new(root, {
                step: 10,
            })
        );

        graticuleSeries.mapLines.template.set("strokeOpacity", 0.1);

        let previousPolygon;

        polygonSeries.mapPolygons.template.on("active", function (
            active,
            target
        ) {
            if (previousPolygon && previousPolygon !== target) {
                previousPolygon.set("active", false);
            }
            if (target.get("active")) {
                selectCountry(target.dataItem.get("id"));
            }
            previousPolygon = target;
        });

        function selectCountry(id) {
            const dataItem = polygonSeries.getDataItemById(id);
            const target = dataItem.get("mapPolygon");
            if (target) {
                const centroid = target.geoCentroid();
                if (centroid) {
                    chart.animate({
                        key: "rotationX",
                        to: -centroid.longitude,
                        duration: 1500,
                        easing: am5.ease.inOut(am5.ease.cubic),
                    });
                    chart.animate({
                        key: "rotationY",
                        to: -centroid.latitude,
                        duration: 1500,
                        easing: am5.ease.inOut(am5.ease.cubic),
                    });
                }
            }
        }

        chart.appear(1000, 100);

        return () => {
            root.dispose();
        };
    }, []);

    return (
        <div>
            <h2 class="main-title"> Earth Search </h2>
            <div
                id="chartdiv"
                ref={chartRef}
                style={{ width: "100%", height: "550px", maxWidth: "100%",marginTop:"10px",marginBottom:"10px"  }}
            />
        </div>
    );
};

export default Earth;
