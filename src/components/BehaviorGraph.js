import React, { useEffect, useRef, useContext } from 'react';
import ReactDOM from 'react-dom';
import G6 from '@antv/g6';

export default (props) => {
    const ref = useRef(null);
    let graph = null;

    useEffect(() => {
        if (!graph) {
            const container = ReactDOM.findDOMNode(ref.current);
            const width = container.scrollWidth;
            const height = container.scrollHeight || 720;
            graph = new G6.TreeGraph({
                container: container,
                width: width,
                height: height,
                modes: {
                    default: [
                        {
                            type: 'collapse-expand',
                            onChange: function onChange(item, collapsed) {
                                const data = item.getModel();
                                data.collapsed = collapsed;
                                return true;
                            },
                        },
                        'drag-canvas',
                        'zoom-canvas',
                    ],
                },
                defaultNode: {
                    size: 26,
                    anchorPoints: [
                        [0, 0.5],
                        [1, 0.5],
                    ],
                },
                defaultEdge: {
                    type: 'cubic-horizontal',
                },
                layout: {
                    type: 'compactBox',
                    direction: 'LR',
                    getId: function getId(d) {
                        return d.id;
                    },
                    getHeight: function getHeight() {
                        return 16;
                    },
                    getWidth: function getWidth() {
                        return 16;
                    },
                    getVGap: function getVGap() {
                        return 10;
                    },
                    getHGap: function getHGap() {
                        return 100;
                    },
                },
            });

            graph.node(function (node) {
                return {
                    label: node.id,
                    labelCfg: {
                        offset: 10,
                        position: node.children && node.children.length > 0 ? 'left' : 'right',
                    },
                };
            });
        };

        fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/algorithm-category.json')
        .then((res) => res.json())
        .then((data) => {
            console.log(props.data);
            graph.data(props.data);
            graph.render();
            graph.fitView();
        });

    }, [])

    return <div ref={ref}></div>;
}
