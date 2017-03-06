<template>
    <div class="panel-item">
        <div class="internel">
            <small>{{title}}</small>
            <br>
            <strong>
                {{data}}
                <span>{{unit.toUpperCase()}}</span>                
            </strong>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'panel',
        props: ['title', 'data', 'unit'],
    }
</script>

<style>
.panel-item {
    display: inline-flex;
    text-align: left;
    border: 1px solid #cfd8dc;
    width: 170px;
    margin: 10px 20px;
}

.panel-item .internel {
    margin: 10px;
    border-left: 4px solid #cfd8dc;
    padding-left: 15px;
}

.panel-item .internel small {
    color: #b0bec5 !important;
    font-weight: normal;
}

.panel-item .internel strong {
    font-weight: 500;
    font-size: 1.5rem;
}


</style>

