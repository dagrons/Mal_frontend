/**
 * libs
 */
import { useContext } from 'react';

/**
 * locals
 */
import { REPORT } from "../pages/Feature";

/**
 * let's go
 */
export default () => {    
    /* use id(filename) as the keyword to query the neo4j */
    const origin_filename = useContext(REPORT).origin_filename

    const url_for_kg = "http://10.128.234.8080?param="

    /* use iframe to embed sub html => fantasy! */
    return <iframe width="100%" height="650" src={url_for_kg + origin_filename} scrolling="no" title="关联分析" />
}