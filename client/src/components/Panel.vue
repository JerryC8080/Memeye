<template>
    <div class="panel">
        <div>
            <PanelItem title="OS Free Mem" :data="Math.floor(freeMem / 1024 / 1024)" unit="mb"></PanelItem>
            <PanelItem title="OS Total Mem" :data="Math.floor(totalMem / 1024 / 1024)" unit="mb"></PanelItem>
        </div>

        <div>
            <PanelItem title="RSS" :data="Math.floor(rss / 1024)" unit="kb"></PanelItem>
            <PanelItem title="Heap Free" :data="Math.floor(heapFree / 1024)" unit="kb"></PanelItem>
            <PanelItem title="Heap Used" :data="Math.floor(heapUsed / 1024)" unit="kb"></PanelItem>
        </div>

        <div>
            <PanelItem v-if="newSpace" title="V8 New Space Used" :data="Math.floor(newSpace.space_used_size / 1024)" unit="kb"></PanelItem>
            <PanelItem v-if="oldSpace" title="V8 Old Space Used" :data="Math.floor(oldSpace.space_used_size / 1024)" unit="kb"></PanelItem>        
            <PanelItem v-if="codeSpace" title="V8 Code Space Used" :data="Math.floor(codeSpace.space_used_size / 1024)" unit="kb"></PanelItem>        
            <PanelItem v-if="mapSpace" title="V8 Map Space Used" :data="Math.floor(mapSpace.space_used_size / 1024)" unit="kb"></PanelItem>    
        </div>
    </div>
</template>

<script>
    import PanelItem from './PanelItem.vue';

    export default {
        name: 'panel',
        props: ['rss', 'heapFree', 'heapUsed', 'freeMem', 'totalMem', 'newSpace', 'oldSpace', 'codeSpace', 'mapSpace', 'largeObjectSpace'],
        components: {
            PanelItem,
        }
    }
</script>

<style>
.panel {
    flex-direction: column;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 10px;
}

.panel div {
    flex-direction: row;
    justify-content: left;    
}
</style>

