/** @jsxImportSource @emotion/react */
import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import styled from "styled-components";

const Container = styled(motion.div)`
    z-index: 51;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: transparent;
    border-radius: 20px 20px 0 0;
    // height: calc(100vh - calc(100vh - 100%));
    padding: 0 0 100px 0
    calc(env(safe-area-inset-bottom, 0) + 30px);

    &:before {
        content: "";
        position: absolute;
        top: 15px;
        left: 0;
        right: 0;
        height: 5px;
        border-radius: 5px;
        background-color: transparent;
        width: 15%;
        margin: auto;
    }

    &:after {
        content: "";
        position: absolute;
        top: calc(100% - 1px);
        left: 0;
        right: 0;
        background-color: transparent;
        height: 100vh;
    }
`;

const Backdrop = styled(motion.div)`
    z-index: 50;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #000;
`;

const Drawer = ({ children, ...props }) => {
    const navigate = useNavigate();

    const close = useCallback(() => {
        navigate("/");
    }, [navigate]);

    const onDragEnd = (
        event,
        info
    ) => {
        const shouldClose =
            info.velocity.y > 20 ||
            (info.velocity.y >= 0 && info.offset.y > 100);
        if (shouldClose) {
            close();
        }
    };

    return (
        <>
          <Container
            drag="y"
            onDragEnd={onDragEnd}
            dragSnapToOrigin
            dragConstraints={{ top: 0 }}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            {...props}
          >
              {children}
          </Container>
          <Backdrop
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={close}
          />
        </>
    );
};

export default Drawer


