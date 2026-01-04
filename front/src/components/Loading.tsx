import styled, { keyframes } from 'styled-components';

const spin = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`;

const Preloader = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    transition: opacity 0.5s ease;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(50px);

    &.hidden {
        opacity: 0;
        pointer-events: none;
    }
`;

const Loader = styled.div`
    width: 60px;
    height: 60px;
    border: 5px solid white;
    border-top: 5px solid var(--primary-dark, #333);
    border-radius: 50%;
    animation: ${spin} 0.7s linear infinite;
`;




const Loading = ({ hidden = false }: { hidden?: boolean }) => {
    return (
        <Preloader className={hidden ? 'hidden' : ''}>
            <Loader />
        </Preloader>
    );
};

export default Loading;