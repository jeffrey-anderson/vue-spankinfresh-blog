<template>
    <!-- Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Confirm Delete</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="onNo">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        {{ message }}
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="onNo">Cancel</button>
                        <button type="button" class="btn btn-primary " data-dismiss="modal" @click="onYes">Delete</button>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
    export default {
        name: 'Modal',
        props: {
            message: {
                type: String,
                default: () => '',
            },
            isOpen: {
                type: Boolean,
                default: () => false,
            },
        },
        methods: {
            onNo() {
                // eslint-disable-next-line no-console
                console.log("ON handleNo");
                this.$emit('handleNo');
            },
            onYes() {
                // eslint-disable-next-line no-console
                console.log("ON handleYes");
                this.$emit('handleYes');
            },
        },
    };
</script>

<style scoped>

</style>