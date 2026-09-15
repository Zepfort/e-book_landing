<script>
    import Chevron from "/src/assets/icons/chevron-down.svg"

    let {faq, isExpanded, ...props} = $props()
</script>

<button class=" flex items-start p-6 border-b-1 border-gray-500 cursor-pointer"
    class:container-expanded={isExpanded} {...props}>
    <div class=" pr-[150px] flex-grow">
        <p class="flex flex-start text-xl font-[600]">{faq.question}</p>
        <p class="text-justify answer mt-4 font-medium text-lg max-h-0 overflow-hidden ">{faq.answer}</p>
    </div>
    <img src={Chevron} alt="" class="flex w-[24px]">
</button>

<style>
    .flex-grow {
        flex-grow: 1;
    }

    .answer {
        transition: 
            max-height 0.3 ease-out,
            opacity 0.3s ease-out;
    }

    button img {
        transition: transform 0.3s linear;
    }

    .container-expanded img {
        transform: rotate(180deg);
    }

    .container-expanded .answer {
        max-height: unset;  
        opacity: 100%; 
    }
</style>