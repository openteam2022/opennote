<template>
    <div class="loading">
        <ul class="loading-list">
            <li >
                <p class="loading-list-one"></p>
            </li>
            <li >
                <p class="loading-list-two"></p>
            </li>
            <li>
                <p class="loading-list-three"></p>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
    
</script>
<style>
    .loading{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 99;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .loading-list{
        margin: 0;
        padding: 0;
        list-style: none;
        display: flex;
        align-items: center;
    }
    .loading-list li{
        box-sizing: border-box;
        width: 20px;
        height: 20px;
        margin: 0 3px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .loading-list li p{
        width: 15px;
        height: 15px;
        background: var(--c-brand);
        border-radius: 50%;
    }
    .loading-list-one{
        animation: one 1s linear 0s infinite;
    }
    .loading-list-two{
        animation: two 1s linear 0s infinite;
    }
    .loading-list-three{
        animation: three 1s linear 0s infinite;
    }
    @keyframes one{
        0%{
            width: 15px;
            height: 15px; 
        }
        20%{
            width: 20px;
            height: 20px;
        }
        35%,100%{
            width: 15px;
            height: 15px;
        }
    }
    @keyframes two{
        0%,35%{
            width: 15px;
            height: 15px;
        }
        50%{
            width: 20px;
            height: 20px;
        }
        70%,100%{
            width: 15px;
            height: 15px;
        }
    }
    @keyframes three{
        0%,65%{
            width: 15px;
            height: 15px;
        }
        85%{
            width: 20px;
            height: 20px;
        }
        100%{
            width: 15px;
            height: 15px;
        }
    }
</style>
